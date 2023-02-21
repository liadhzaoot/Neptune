import { Handle, Position } from "reactflow";
import { ColumnNode, DbNode, TableNode } from "../App/NodesObjects";

export function CustomNode({data}:any){
    return (
      <>
      <Handle type="target" position={Position.Top} />
      <div>
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
      <Handle type="source" position={Position.Bottom} id="b" />
    </>
      )
}