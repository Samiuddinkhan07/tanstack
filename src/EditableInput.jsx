import { Input } from '@chakra-ui/react'
 
import {useState,useEffect} from 'react'

const EditableInput = ({getValue,row,column,table}) => {

    const inititalValue = getValue();
    const [value,setValue] = useState(inititalValue);

    const onBlur = () =>{
        table.options.meta?.updateData(row.index,column.id,value);
    }

    useEffect(() =>{
        setValue(inititalValue)
    },[inititalValue])

  return (
    <Input
    value={value}
    onChange={e => setValue(e.target.value)}
    onBlur={onBlur}
    variant="filled"
    size="sm"
    w="85%"
    overflow="hidden"
    textOverflow="ellipsis"
    whiteSpace="nowrap"
    />
  )
}

export default EditableInput