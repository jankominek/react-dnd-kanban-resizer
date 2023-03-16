import styled from "styled-components";

export const TaskKanbanBoxWrapper = styled.div`
    width: 20rem;
    background: white;
    border-radius: .5rem;
    display: flex;
    box-shadow: 0px 0px 30px -16px rgba(66, 68, 90, 1);
    margin: 1rem 0rem 1rem 1rem;
    flex-direction: column;
`
export const KanbanBoxTitleField = styled.div`
    width: 100%:
    display: flex;
`

export const KanbanTitle = styled.p`
    font-size: 2rem;
    text-align: center;
`
export const KanbanComponentWrapper = styled.div<{isDraggingOver: boolean}>`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 1;
    ${({isDraggingOver}) => isDraggingOver && `
        border-radius: .5rem;
        background: #F0F0F0;
    `}
`

export const DroppableWrapper = styled.div`
    border: 1px solid red;
    height: 20rem;
`