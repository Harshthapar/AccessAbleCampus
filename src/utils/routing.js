import { CAMPUS_ROUTE_NODES, CAMPUS_ROUTE_EDGES } from '../data/campusData';

/**
 * Demo Route Finding Engine using Dijkstra / Breadth First Search with accessibility penalty weighting
 */
export const findAccessibleRoute = (startNodeId, targetNodeId, preferences = {}) => {
  if (!startNodeId || !targetNodeId) return null;
  if (startNodeId === targetNodeId) {
    const node = CAMPUS_ROUTE_NODES[startNodeId];
    return {
      success: true,
      path: [startNodeId],
      totalDistance: 0,
      estimatedTimeMinutes: 1,
      routeNodes: [node],
      segments: [],
      fullCoordinates: [[node.lat, node.lng]],
      featuresEncountered: ['Direct on-site destination'],
      potentialBarriers: [],
      description: 'You are already at the requested building location.'
    };
  }

  // Build adjacency graph
  const graph = {};
  Object.keys(CAMPUS_ROUTE_NODES).forEach(nodeId => {
    graph[nodeId] = [];
  });

  CAMPUS_ROUTE_EDGES.forEach(edge => {
    graph[edge.from]?.push({ to: edge.to, edge });
    // Bidirectional edges
    graph[edge.to]?.push({
      to: edge.from,
      edge: {
        ...edge,
        from: edge.to,
        to: edge.from,
        path: [...edge.path].reverse()
      }
    });
  });

  // Calculate edge weight penalty based on preferences
  const calculateWeight = (edge) => {
    let weight = edge.distance;

    // Penalty for stairs if user wants to avoid stairs
    if (preferences.avoidStairs && edge.hasStairs) {
      weight += 10000; // huge penalty
    }

    // Reward for ramps if preferred
    if (preferences.preferRamps && edge.hasRamp) {
      weight *= 0.75;
    }

    // Reward for elevators if preferred
    if (preferences.preferElevators && edge.hasElevator) {
      weight *= 0.8;
    }

    // Bonus for tactile paving
    if (edge.hasTactilePaving) {
      weight *= 0.9;
    }

    // Penalty for uneven pavement
    if (!edge.pavedSmooth) {
      weight *= 1.35;
    }

    return weight;
  };

  // Dijkstra Algorithm
  const distances = {};
  const previous = {};
  const unvisited = new Set(Object.keys(CAMPUS_ROUTE_NODES));

  Object.keys(CAMPUS_ROUTE_NODES).forEach(node => {
    distances[node] = Infinity;
  });
  distances[startNodeId] = 0;

  while (unvisited.size > 0) {
    // Find node with minimum distance
    let current = null;
    for (const node of unvisited) {
      if (current === null || distances[node] < distances[current]) {
        current = node;
      }
    }

    if (distances[current] === Infinity || current === targetNodeId) {
      break;
    }

    unvisited.delete(current);

    const neighbors = graph[current] || [];
    for (const neighbor of neighbors) {
      if (unvisited.has(neighbor.to)) {
        const alt = distances[current] + calculateWeight(neighbor.edge);
        if (alt < distances[neighbor.to]) {
          distances[neighbor.to] = alt;
          previous[neighbor.to] = { from: current, edge: neighbor.edge };
        }
      }
    }
  }

  // Reconstruct path
  const pathNodeIds = [];
  const segments = [];
  let curr = targetNodeId;

  while (curr && previous[curr]) {
    pathNodeIds.unshift(curr);
    segments.unshift(previous[curr].edge);
    curr = previous[curr].from;
  }

  if (curr === startNodeId) {
    pathNodeIds.unshift(startNodeId);
  } else {
    // Fallback if path not found
    return {
      success: false,
      message: 'No suitable accessible pathway found between these buildings with current strict preferences.'
    };
  }

  // Assemble full polyline coordinates and metrics
  let totalDistanceMeters = 0;
  const fullCoordinates = [];
  const featuresEncountered = new Set();
  const potentialBarriers = [];

  segments.forEach((seg, idx) => {
    totalDistanceMeters += seg.distance;
    if (seg.hasRamp) featuresEncountered.add('Continuous ADA Ramps');
    if (seg.hasElevator) featuresEncountered.add('Level Access Elevators Available');
    if (seg.hasTactilePaving) featuresEncountered.add('Ground Tactile Paving Indicators');
    if (seg.pavedSmooth) featuresEncountered.add('Smooth Low-Vibration Concrete Pavement');
    
    if (seg.hasStairs) {
      potentialBarriers.push(`Segment near ${CAMPUS_ROUTE_NODES[seg.from].name}: Secondary staircase exists (step-free ramp option alongside).`);
    }
    if (!seg.pavedSmooth) {
      potentialBarriers.push(`Segment near ${CAMPUS_ROUTE_NODES[seg.from].name}: Historic cobblestones / brick pavement with minor vibration.`);
    }

    seg.path.forEach((pt, ptIdx) => {
      if (idx > 0 && ptIdx === 0) return; // avoid duplicate point
      fullCoordinates.push(pt);
    });
  });

  // Calculate estimated time assuming typical comfortable wheelchair / mobility speed ~ 70 meters/minute
  const estimatedTimeMinutes = Math.max(2, Math.round(totalDistanceMeters / 65));

  return {
    success: true,
    startNode: CAMPUS_ROUTE_NODES[startNodeId],
    targetNode: CAMPUS_ROUTE_NODES[targetNodeId],
    pathNodeIds,
    segments,
    totalDistance: totalDistanceMeters,
    estimatedTimeMinutes,
    fullCoordinates,
    featuresEncountered: Array.from(featuresEncountered),
    potentialBarriers,
    description: `Follow the designated barrier-free campus spine from ${CAMPUS_ROUTE_NODES[startNodeId].name} passing through ${pathNodeIds.length - 2 > 0 ? (pathNodeIds.length - 2) + ' intermediate access points' : 'direct connectors'} to ${CAMPUS_ROUTE_NODES[targetNodeId].name}.`
  };
};

