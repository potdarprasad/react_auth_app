import React, { ReactNode, useContext } from 'react'
import { AxiosContext } from '../context/AxiosContext';
import { Container } from 'react-bootstrap';
import Loader from '../components/Loader';

type AppLayoutProps = {
    children: ReactNode
}

const AppLayout = ({ children }: AppLayoutProps) => {
    const { isLoading } = useContext(AxiosContext);
    return (
        <Container fluid>  
            { isLoading ? <Loader/> : children}
        </Container>
    )
}

export default AppLayout