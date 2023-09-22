import { Dialog, RadioGroup } from "@headlessui/react";

function EditDialogBox({ user, handleUpdate, editing, setEditing, setUser}) {
    
    function onClose(setUser, setEditing){
        setUser({});
        setEditing(false);
    }
    
    return (
        <Dialog open={editing} className="relative z-10" onClose={_=>onClose(setUser,setEditing)}>
            {/* <div className="fixed inset-0 flex w-screen items-center justify-center p-4 backdrop-blur-sm backdrop-filter bg-opacity-5 firefox:bg-opacity-90"> */}
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                <Dialog.Panel className="w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl flex flex-col gap-4">
                    <Dialog.Title className="text-xl font-bold">Edit Details</Dialog.Title>
                    <Dialog.Description>
                        Check your changes before saving
                    </Dialog.Description>


                    <label
                        htmlFor="username"
                        className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                    >
                        <input
                            type="text"
                            id="username"
                            className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 p-3"
                            placeholder="Username"
                            // value={editedName}
                            // onChange={(e) => { setEditedName(e.target.value) }}
                            value={user.name}
                            onChange={(e)=>{setUser({...user, 'name': e.target.value})}}
                        />
                        <span
                            className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                        >
                            Username
                        </span>
                    </label>
                    <label
                        htmlFor="email"
                        className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                    >
                        <input
                            type="email"
                            id="email"
                            className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 p-3"
                            placeholder="Email"
                            value={user.email}
                            onChange={(e)=>{setUser({...user, 'email': e.target.value})}}
                        />

                        <span
                            className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                        >
                            E-Mail
                        </span>
                    </label>
                    <div className="p-3">
                        <h1 className="start-2.5 top-0 -translate-y-1/2 p-0.5 text-xs text-gray-700">Role</h1>
                        <RadioGroup 
                        value={user.role} onChange={(e)=>{console.log(e);setUser({...user, 'role': e})}} 
                        className="flex flex-rol gap-2">
                            {/* <RadioGroup.Label classname="sr-only">Role</RadioGroup.Label> */}
                            <RadioGroup.Option
                                value="member"
                                className="pointer"
                            >{({ checked }) => (
                                <span className={checked ? 'bg-blue-200 text-white border-solid rounded border-blue p-2' : 'p-2'}>Member</span>)}
                            </RadioGroup.Option>
                            <RadioGroup.Option
                                value="admin"
                                className=" pointer"
                            >{({ checked }) => (
                                <span className={checked ? 'bg-blue-200 text-white border-solid rounded border-blue p-2' : 'p-2'}>Admin</span>)}
                            </RadioGroup.Option>
                        </RadioGroup>
                    </div>
                    <div className="w-full flex flex-row ml-1 gap-2 justify-end">
                        <button className='px-4 py-1 rounded-full bg-green-500' onClick={_ => {
                            handleUpdate({...user});
                            setUser({});
                            setEditing(false);
                        }}>Save</button>
                        <button className='px-1 py-1 rounded-full' onClick={_=>onClose(setUser,setEditing)}>Cancel</button>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    )
}

export default EditDialogBox