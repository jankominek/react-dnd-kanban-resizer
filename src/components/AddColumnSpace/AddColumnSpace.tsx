import React, {FC} from "react"
import { AddColumnSpaceWrapper, IconWrapper } from "./AddColumnSpace.styled"
import { FaPlus } from "react-icons/fa";

export const AddColumnSpaceComponent: FC<{onClick: () => void}> = ({onClick}) => {

    return (
        <AddColumnSpaceWrapper onClick={onClick} data-test="addKanban">
            <IconWrapper>
                <FaPlus/>
            </IconWrapper>
        </AddColumnSpaceWrapper>
    )
}