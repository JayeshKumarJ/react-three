
export default function Capsule({position,scale,color,side}){
    return (
        <mesh position={position} side ="doublesided">
          <capsuleGeometry scale ={scale}/>
          <meshBasicMaterial color={color} side={side}/>
        </mesh>
    )
}