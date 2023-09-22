import { ReactComponent as ForwardArrow } from "../images/forward_arrow.svg";
import { ReactComponent as DoubleForwardArrow } from "../images/double_forward_arrow.svg";
import { ReactComponent as BackwardArrow } from "../images/backward_arrow.svg";
import { ReactComponent as DoubleBackwardArrow } from "../images/double_backward_arrow.svg";
import { useEffect, useMemo } from "react";

function PageNavigation({ users, userList, pageNo, setPageNo }) {

    const firstPage = 1;
    const lastPage = useMemo(_ => Math.ceil(userList.length / 10), [userList]);
    const numOfPages = useMemo(_ => {
        const length = Math.ceil(users.length / 10);
        const newArray = new Array(length);
        for (let i = 0; i < length; i++) {
            newArray[i] = 1 + i;
        }
        return newArray
    }, [users]);

    useEffect(_ => {
        console.log(numOfPages, [userList]);
        setPageNo(1);
    },[userList]);

    return (
        <div className="flex flex-row w-full flex-grow justify-center gap-6 my-3">
            <button onClick={() => { if (pageNo != firstPage) setPageNo(firstPage) }} className={"rounded-full p-2 border-2 transition hidden md:block " + (pageNo == firstPage ? "bg-gray-100 text-gray-400 cursor-auto" : "bg-blue-500 text-white")}>
                <DoubleBackwardArrow/>    
            </button>
            <button onClick={() => { if (pageNo != firstPage) { setPageNo(pageNo - 1) } }} className={"rounded-full p-2  border-2 transition " + (pageNo == firstPage ? "bg-gray-100 text-gray-400 cursor-auto" :"bg-blue-500  text-white")}>
                <BackwardArrow/>   
            </button>

            {numOfPages.map((i) =>

            (<button key={i}
            >
                <input type='radio' id={i} value={i} disabled={i > lastPage} checked={pageNo == i} name="pageNumber" className='hidden' onChange={_ => { console.log(pageNo); setPageNo(i) }} />
                <label htmlFor={i} className={"px-3 py-1.5 rounded-full border-2 transition " + (pageNo == i ? " checked " : "bg-blue-500 text-white ") + (lastPage < i ? "opacity-50 cursor-auto" : "cursor-pointer")}>
                    {i}</label>
            </button>))}


            <button onClick={() => { if (pageNo != lastPage) { setPageNo(pageNo + 1) } console.log(pageNo)}}
                className={"rounded-full p-2 border-2 transition " + (pageNo == lastPage ? "bg-gray-100 text-gray-400" :"bg-blue-500  text-white")}>
                <ForwardArrow/>
            </button>

            <button onClick={() => {if(pageNo != lastPage); setPageNo(lastPage) }}
                className={"rounded-full p-2 border-2 hidden md:block transition " + (pageNo == lastPage ? "bg-gray-100 text-gray-400" : "bg-blue-500  text-white")}>
                <DoubleForwardArrow/>
            </button>
        </div>
    )
}

export default PageNavigation

