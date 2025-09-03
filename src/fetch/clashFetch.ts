import { GET_ALL_CLASHES_ENDPOINT, GET_CLASH_BY_ID_ENDPOINT,  } from "@/lib/apiEndPoints";

export async function getClashes({ token }: { token: string }) {
  try {
    const res = await fetch(GET_ALL_CLASHES_ENDPOINT, {
      headers: {
        Authorization: token,
      },
      next: {
        revalidate: 2,
        tags: ["dashboard"],
      },
    });

    if (!res.ok) throw new Error("Failed to fetch clashes");

    const response = await res.json();
    if (response.statusCode !== 200) throw new Error(response.message);

    return response.data;
    
  } catch (error) {
    // console.log(error);
  }
}

export async function getClashItemByClashId(id: string){

  try {
    const res = await fetch(`${GET_CLASH_BY_ID_ENDPOINT}/${id}`)

    if (!res.ok) {
        // console.log("res", res);
      throw new Error("Failed to fetch clash");
    };

    const response = await res.json();
    if (response.statusCode !== 200) throw new Error(response.message);

    if(response.success){
      // console.log(response, "response data");
      return response.data;
    }
    
  } catch (error) {
    // console.log(error);
  }

}
