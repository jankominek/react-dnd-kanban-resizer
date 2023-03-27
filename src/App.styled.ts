import styled from 'styled-components';

export const AppWrapper = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
`

export const TableWrapper = styled.div`
    width: 100%;
    height: 90%;
    position: relative;
    border-radius: .5rem;
    background: #459F96;
    display: flex;
    align-items: stretch;
    overflow-x: auto;
    white-space: nowrap; 
`

export const AppContent = styled.div`
    width: 90%;
    height: 90%;
    display: flex;
    flex-direction: column;
`

export const TaskAddWrapper = styled.div`
    margin: 1% 0;
    border-radius: .5rem;
    background: #459F96;
    display: flex;
`

export const TaskInput = styled.input`
    margin: .5rem;
    padding: 1rem 1rem;
    width: fit-content;
    flex-grow: 10;
    border-radius: .5rem;
    font-size: 20px;
    border: none;
    &:focus{
        outline: none;
    }
`

export const AddButton = styled.div`
    flex-grow: 1;
    background: #FF9900;
    border-radius: .5rem;
    margin: .5rem;
    padding: 1rem 1rem;
    display: flex;
    justify-content: center;
    font-weight: bold;
    letter-spacing: 1px;
    font-size: 1.1rem;
    align-items: center;
`