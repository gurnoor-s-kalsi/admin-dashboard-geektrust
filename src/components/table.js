import { useMemo } from "react"

/* functions used by checkboxes and buttons on each row*/
function isChecked( userId, checkedArray ) {
    if ( !userId || checkedArray.length < 1 ) {
        return false
    }
    else {
        return checkedArray.includes( userId )
    }
}

function isAllChecked( currentPageUsers, checkedArray ) {
    let result = true;
    if ( currentPageUsers.length == 0 || checkedArray.length == 0 )
        result = false
    else
        result = currentPageUsers.reduce( ( acc, curr ) => {
            if ( acc == false ) return false
            if ( checkedArray.includes( curr[ 'id' ] ) )
                acc = true
            else acc = false
            console.log( acc )
            console.log( curr )
            return acc
        }, true );

        return result;
}

function selectAll( checked, currentPageUsers, checkedArray, setCheckedArray ) {
    if ( checked ) {
        setCheckedArray( [ ...currentPageUsers.map( user => user[ 'id' ] ) ] )
    } else {
        if ( checkedArray.length > 0 )
            setCheckedArray( [ ...currentPageUsers.filter( ( value ) => {
                if ( currentPageUsers.some( user => user[ 'id' ] == value ) )
                    return false;
                else return true;
            } ) ] )
    }
}

function onChange(checked,id,checkedArray,setCheckedArray){
 if ( checked ) 
 setCheckedArray( [ ...checkedArray, id ] ); 
else setCheckedArray( checkedArray.filter( item => item !== id ) ) }

/*Component to render Table  */

function Table( { users, userList, pageNo, setConfirm, deleteIds, setDeleteIds, setCurrentUser, setEditing } ) {

    const userListCurrent = useMemo( _ => userList.filter( ( _, index ) => {
        if ( Math.floor( ( index / 10 ) + 1 ) == pageNo ) {
            return true
        }
        else
            return false
    } ), [ userList, pageNo ] )

    return (

        <table className="table-fixed min-w-full divide-y divide-gray-300 bg-white dark:divide-gray-700 dark:bg-gray-900">
            <thead className="text-left">
                <tr>
                    <th className="px-4 py-2 w-1/5">
                        <label htmlFor="SelectAll" className="sr-only">
                            SelectAll
                        </label>
                        <input type="checkbox"
                            id="SelectAll"
                            value="all"
                            checked={isAllChecked( userListCurrent, deleteIds )}
                            className="h-5 w-5 rounded border-gray-300"
                            onChange={ e => selectAll( e.target.checked, userListCurrent, deleteIds, setDeleteIds ) }
                        />
                    </th>
                    <th className="capitalize  px-4 py-2 font-bold w-1/5">name</th>
                    <th className="capitalize  px-4 py-2 font-bold w-1/5">email</th>
                    <th className="capitalize  px-4 py-2 font-bold w-1/5">role</th>
                    <th className="capitalize  px-4 py-2 font-bold w-1/5">actions</th>
                </tr>
            </thead>

            <tbody className="divide-y divide-gray-300">

                { users == undefined ? <></> :
                    userListCurrent.map( user => (
                        <tr key={ user[ 'id' ] } className={ isChecked( user[ 'id' ], deleteIds ) ? 'bg-gray-200' : '' }>
                            <td className="px-4 py-2">
                                <label className="sr-only" htmlFor={ "Row" + user[ 'id' ] }>Row { user[ 'id' ] }</label>
                                <input
                                    className="h-5 w-5 rounded border-gray-300"
                                    type="checkbox"
                                    value={ user[ 'id' ] }
                                    id={ "Row" + user[ 'id' ] }
                                    onChange={ e => onChange(e.target.checked, user['id'],deleteIds, setDeleteIds) }
                                    checked={ isChecked( user[ 'id' ], deleteIds ) }
                                />
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 font-medium">
                                <span>{ user[ 'name' ] }</span>
                            </td>
                            <td className=" px-4 py-2"><span>{ user[ 'email' ] }</span></td>
                            <td className=" px-4 py-2 capitalize"><span>{ user[ 'role' ] }</span></td>
                            <td className="whites px-4 py-2">
                                <button className="mr-5" onClick={ () => { setCurrentUser( user ); setEditing( true ) } }><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={ 1.5 } stroke="currentColor" className="w-5 h-5 stroke-gray-600">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                </svg>
                                </button>
                                <button onClick={ ( event ) => { setCurrentUser( user ); setConfirm( true ); console.log( event ) } }><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={ 1.5 } stroke="currentColor" className="w-5 h-5 stroke-red-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                                </button>
                            </td>
                        </tr> ) ) }
            </tbody>
        </table>
    )
}

export default Table