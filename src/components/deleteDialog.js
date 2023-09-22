import { Dialog } from "@headlessui/react"

function onClose(setUser, setConfirm){
    setUser({});
    setConfirm(false);
}

function onClick(user, setUser, checkedArray ,setCheckedArray, handleDelete, handleDeleteMultiple, setConfirm) {
    if(user.id) {
        handleDelete(user.id);
        setUser({});
    }
    else if( checkedArray.length > 0) {
        handleDeleteMultiple(checkedArray); 
        setCheckedArray([])}
    else alert('No selection');
    setConfirm(false);
}

function DeleteDialogBox({confirm, setConfirm, user, setUser, checkedArray, setCheckedArray, handleDelete, handleDeleteMultiple}){
    
    return (<Dialog open={confirm} className="relative z-10" onClose={_=>onClose(setUser,setConfirm)}>
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                <Dialog.Panel className="w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl flex flex-col gap-4">
                <Dialog.Description>
                { user.id ? 
                <p>Are you sure you want to delete this entry?</p> : 
                <p>Confirm deletion multiple entries?</p>}
                </Dialog.Description>
                <div className="w-full flex flex-row ml-1 gap-2 justify-end">
                        <button className='px-4 py-1 rounded-full bg-red-500' onClick={_ => {
                        onClick(user, setUser, checkedArray ,setCheckedArray, handleDelete, handleDeleteMultiple, setConfirm)
                        }}>Delete</button>
                        <button className='px-1 py-1 rounded-full' onClick={_=>{onClose(setUser,setConfirm)}}>Cancel</button>
                    </div>
                </Dialog.Panel>
                </div>
            </Dialog>)
}

export default DeleteDialogBox