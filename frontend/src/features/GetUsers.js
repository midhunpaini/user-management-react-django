const getUsers = async()=>{
    const data = await fetch("http://localhost:8000/api/djadmin", {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const json = await data.json();
    return(
        json
    )
}
export default getUsers