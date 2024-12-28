export const getAllGroups = async () => {
    try {
        const resp = await fetch("http://localhost:3001/api/v1/group", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })

        const respJSON = await resp.json()
        console.log(respJSON)
        return respJSON

    } catch (err) {
        throw new Error("Something went wrong : " + err)
    }
}