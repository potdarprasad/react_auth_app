import React from 'react'
import { Table } from 'react-bootstrap'

function NotesTable() {
    return (
        <Table responsive bordered striped className='text-center'>
            <thead>
                <tr>
                    <td>#</td>
                    <td>Title</td>
                    <td>Action</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </tbody>
        </Table>
    )
}

export default NotesTable