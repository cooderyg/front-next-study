import BoardWriteUI from "./BoardWrite.presenter"
import { useMutation } from "@apollo/client"
import { CREATE_BOARD, UPDATE_BOARD } from "./BoardWrite.queries"
import { useState } from "react"
import { useRouter } from "next/router"

export default function BoardWrite (props) {
    const router = useRouter()

    const [writer, setWriter] = useState("")
    const [title, setTitle] = useState("")
    const [contents, setContents] = useState("")

    const [createBoard] = useMutation(CREATE_BOARD)
    const [updateBoard] = useMutation(UPDATE_BOARD)

    const onClickSubmit = async () => {
      const result = await createBoard({
        variables:{                  // variables 이게 $역할을 함  
            writer,
            title,
            contents,
        }
      })
      console.log(result)
      router.push(`/section09/09-04-boards/${result.data.createBoard.number}`)
    }

    const onClickUpdate = async () => {
      const updateVariables = { number:Number(router.query.number) }
      if(title) updateVariables.title = title
      if(writer) updateVariables.writer = writer
      if(contents) updateVariables.contents = contents

      //여기서 수정하기
     const result = await updateBoard({
       variables: updateVariables
      })
      router.push(`/section09/09-04-boards/${result.data.updateBoard.number}`)
    }

    const OnChangeWriter = (event) => {
       setWriter(event.target.value)
    }
    const OnChangeTitle = (event) => {
       setTitle(event.target.value) 
    }
    const OnChangeContents = (event) => {
       setContents(event.target.value) 
    }
 
    return(
      <BoardWriteUI 
        onClickSubmit={onClickSubmit}
        onClickUpdate={onClickUpdate}
        OnChangeWriter={OnChangeWriter}
        OnChangeTitle={OnChangeTitle}
        OnChangeContents={OnChangeContents}
        isEdit={props.isEdit}
        data={props.data} // undefined 이거나, data 이거나 둘 중 하나!
      />
    )
 
}