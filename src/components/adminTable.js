import { useMemo, useState } from 'react'
import EditDialogBox from './editDialog'
import DeleteDialogBox from './deleteDialog'
import SearchBar from './searchbar'
import Table from './table'
import PageNavigation from './pageNavigation.js'

function AdminTable( { users, dispatch } ) {
    console.log( users )
    const [ editing, setEditing ] = useState( false )
    const [ confirm, setConfirm ] = useState( false )
    const [ currentUser, setCurrentUser ] = useState( {} )
    const [ searchTerm, setSearchTerm ] = useState( '' )
    const [ pageNo, setPageNo ] = useState( 1 )
    const userList = useMemo( () => { return users.filter( ( user ) => { return searchTerm == '' ? true : ( user.name.includes( searchTerm ) || user.email.includes( searchTerm ) || user.role.includes( searchTerm ) ) } ) }, [ users, searchTerm ] )
    const [ deleteIds, setDeleteIds ] = useState( [] )
    function handleUpdate( user ) {
        console.log( user.id )
        dispatch( {
            type: 'updated',
            user: {
                id: user.id,
                name: user.name,
                role: user.role,
                email: user.email
            }
        } )
    }

    function handleDelete( id ) {
        dispatch( {
            type: 'delete',
            id: id
        } )
    }

    function handleDeleteMultiple( ids ) {
        dispatch( {
            type: 'delete_mulitple',
            ids: ids
        } );
    }

    return (
        <>
            <div className={ "p-6 mx-auto" + ( editing || confirm ? " opacity-50" : "" ) }>
                {/* <div className={"overflow-x-auto p-6 mx-auto"}> */ }
                <SearchBar searchTermr={ searchTerm } setSearchTerm={ setSearchTerm } />
                <Table users={ users } userList={ userList } deleteIds={deleteIds} setDeleteIds={setDeleteIds} pageNo={ pageNo } confirm={ confirm } setConfirm={ setConfirm } setCurrentUser={ setCurrentUser } setEditing={ setEditing } />
                <div className="flex flex-col md:flex-row w-full m-3">
                    <button className="border rounded-full flex-shrink-0 text-white bg-red-500 border-box m-3 px-2 text-sm" onClick={_ =>  setConfirm(true) }>Delete Selected</button>
                    <PageNavigation users={ users } userList={ userList } pageNo={ pageNo } setPageNo={ setPageNo } />
                </div>
            </div>
            <EditDialogBox editing={ editing } user={ currentUser } handleUpdate={ handleUpdate } setEditing={ setEditing } setUser={ setCurrentUser } />
            <DeleteDialogBox confirm={ confirm } setConfirm={setConfirm} user={ currentUser } setUser={setCurrentUser} checkedArray={deleteIds} setCheckedArray={setDeleteIds} handleDelete={ handleDelete } handleDeleteMultiple={ handleDeleteMultiple } />
        </>
    )
}

export default AdminTable


