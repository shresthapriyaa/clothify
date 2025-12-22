// "use client"
// import { signIn, useSession } from 'next-auth/react'
// import React from 'react'

// const Page = () => {
//     const { data: session, status } = useSession()

//     return (
//         <div className='flex flex-col h-screen justify-center items-center'>
//             {status === "unauthenticated" && (
//                 <button
//                     className='cursor-pointer bg-black px-4 py-2 rounded-md text-white'
//                     onClick={() => signIn("google")}
//                 >
//                     Login with Google
//                 </button>
//             )}

//             <div>Logged In as: {session?.user?.name}</div>
//             <pre>{JSON.stringify(session, null, 2)}</pre>
//         </div>
//     )
// }

// export default Page





"use client"
import { signIn, signOut, useSession } from 'next-auth/react'
import React from 'react'
import LoginPageWithCredentials from './LoginPageWithCredentials'
// import LoginPageWithCredentials from './LoginWithCredentials'

const Page = () => {
    const { data: session, status } = useSession()

    return (
        <div className='flex flex-col h-screen '>
            <LoginPageWithCredentials />

             {status === "unauthenticated" && (
                 <button
                   className='cursor-pointer bg-black px-4 py-2 rounded-md text-white'
                   onClick={() => signIn("google")}
                >
                   Login 
                </button>
            )}

            {status === 'authenticated' && (
                <button
                    className='cursor-pointer bg-black px-4 py-2 w-40 rounded-md text-white'
                    onClick={() => signOut()}
                >
                    log out
                </button>)}


            <div>Logged In as: {session?.user?.name}</div>
            <pre>{JSON.stringify(session, null, 2)}</pre>
        </div>
    )
}

export default Page
