const queries = {
    listNotes : `query listNotes{
        listNotes{
          items{
            __typename
            id
            note
          }
        }
    }`,
      
    createNote : `mutation createNote($note: String!){
        createNote(input:{
          note: $note
        }){
          __typename
          id
          note
        }
    }`,
    
    deleteNote : `mutation deleteNote($id: ID!){
      deleteNote(input:{
        id: $id
      }){
        __typename
        id
        note
      }
    }`, 
    
    searchNotes : `query searchNotes($search: String){
      searchNotes(filter:{note:{match:$search}}){
        items{
          id
          note
        }
      }
    }`    
}

export { queries }