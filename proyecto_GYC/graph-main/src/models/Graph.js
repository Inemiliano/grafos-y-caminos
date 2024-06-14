export default class Graph {
    #adjacencyMatrix = [];
    #vertexMap = new Map();

    constructor() {}

    insertVertices(...vertices) {
        for (let vertex of vertices) {
            this.#adjacencyMatrix.push([]);
            this.#vertexMap.set(vertex, this.#adjacencyMatrix.length - 1);
        }
    }

    insertVertex(vertex) {
        this.#adjacencyMatrix.push([]);
        this.#vertexMap.set(vertex, this.#adjacencyMatrix.length - 1);
    }

    insertEdge(start, end, weight = 1) {
        if (this.#vertexMap.has(start) && this.#vertexMap.has(end)) {
            this.#adjacencyMatrix[this.#vertexMap.get(start)][this.#vertexMap.get(end)] = weight;
            return true;
        }
        return false;
    }

    breadthFirstSearch(callback) {
        let queue = [];
        let visited = Array(this.#adjacencyMatrix.length).fill(false);
        const entries = [...structuredClone(this.#vertexMap)];

        let [startVertex] = entries[0];
        queue.push(startVertex);

        while (queue.length > 0) {
            let currentVertex = queue.shift();
            callback(currentVertex);
            visited[this.#vertexMap.get(currentVertex)] = true;

            for (let i = 0; i < this.#adjacencyMatrix[this.#vertexMap.get(currentVertex)].length; i++) {
                if (this.#adjacencyMatrix[this.#vertexMap.get(currentVertex)][i]) {
                    let [neighborVertex] = entries[i];
                    if (!visited[this.#vertexMap.get(neighborVertex)] && !queue.includes(neighborVertex)) {
                        queue.push(neighborVertex);
                    }
                }
            }
        }
    }
}
