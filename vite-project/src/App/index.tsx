import { useState, useCallback, useEffect, useMemo } from 'react';
import ReactFlow, {
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  NodeChange,
  EdgeChange,
  Edge
} from 'reactflow';
import 'reactflow/dist/style.css';
import { getDbList } from '../Api/Neptune';
import { CustomNode } from '../Components/CustomeNode';

interface Location{
  x:number,
  y:number
}
interface Node{
  id: string,
    data: object,
    position: Location,
}
const initialNodes:Node[] = [];

const initialEdges:Edge[] = [];
const createdEdges = (source:string,target:string) => {
  return { id: `${source} - ${target}`, source, target, type: 'step' }

}
const createNode = (data:string,id:string,location:Location):Node => {
  return {
    id,
    data: { label: data },
    position: { x: location.x, y: location.y }
  }
}

function Flow() {
  const nodeTypes = useMemo(() => ({ customNode: CustomNode }), []);
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  useEffect(() => {
    getDbList().then(async result => {
      const dbs = result.data
      let x = 1
      let y = 500
      for (let database of dbs){
        const tables = database.tables
        const databaseId = (initialNodes.length + 1).toString()
        for(let table of tables){
          const columns = table.columns
          y = y + (columns.length)
          const tableId =(initialNodes.length + 1).toString()
          initialEdges.push(createdEdges(databaseId,tableId))
          initialNodes.push(createNode(JSON.stringify(table["tableName"]),tableId,{x:x + 100 +((columns.length)*100)/2,y:y-100}))
          for (let column of columns){
            x = x + 100
            const columnId = (initialNodes.length + 1).toString()
            initialNodes.push(createNode(JSON.stringify(column["columnName"]),columnId,{x,y}))
            initialEdges.push(createdEdges(tableId,columnId))

          }
          x = x +300
        }
        initialNodes.push(createNode(JSON.stringify(database["hostName"]),databaseId,{x:x/2,y:y-400}))


      }
      setNodes([...initialNodes]);
      setEdges([...initialEdges])

    });
  },[]);
  
   
  const onNodesChange = useCallback(
    (changes:NodeChange[]) => setNodes((nds) => {
      return applyNodeChanges(changes, nds);
    }),
    []
  );
  const onEdgesChange = useCallback(
    (changes:EdgeChange[]) => setEdges((eds:Edge[]) => {
      return applyEdgeChanges(changes, eds);
    }),
    []
  );

  const onConnect = useCallback((params:Edge) => setEdges((eds) => addEdge(params, eds)), []);

  return (
    <div style={{ height: '100%' }}>
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default Flow;
