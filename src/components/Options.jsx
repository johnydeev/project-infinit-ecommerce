export default function Options({list}){
    return(
        <>
            {Array.from(list).map((element, index )=> {
                return <option key={index}>{element.name}</option>
            })}
        </>
    )
}