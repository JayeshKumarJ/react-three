
export default function Circle({position,scale,color,side}){
    return (
        <mesh position={position} side ="doublesided">
          <circleGeometry scale ={scale}/>
          <meshStandardMaterial color={color} side={side}/>
        </mesh>
    )
}