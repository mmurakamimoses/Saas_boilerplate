import { auth } from "@/lib/auth";
import { headers } from "next/headers";


export default async function UserInfo() {
 const session = await auth.api.getSession({ headers: await headers() });


 if (!session?.user) {
   return <div className="p-4 border rounded-lg bg-white shadow max-w-md w-full mb-2">Not signed in</div>;
 }


 const { id, name, email, planType, role, image, createdAt, updatedAt } = session.user as any;
 const avatar = image || "/default-profile-pic.webp";


 return (
   <div className="p-4 border rounded-lg bg-white shadow max-w-md w-full mb-2">
     <h3 className="text-sm font-semibold mb-2">User Information</h3>
     <div className="flex items-center gap-3 mb-2">
       <img src={avatar} alt="User avatar" className="w-10 h-10 rounded-full border object-cover" />
       <div>
         <div className="font-medium text-base">{name || "-"}</div>
         <div className="text-xs text-gray-500">{email || "-"}</div>
       </div>
     </div>
     <div className="text-xs space-y-1">
       <div><span className="font-medium">ID:</span> {id}</div>
       <div><span className="font-medium">Plan:</span> {planType || "Free"}</div>
       <div><span className="font-medium">Role:</span> {role || "user"}</div>
       {createdAt && <div><span className="font-medium">Created:</span> {String(createdAt)}</div>}
       {updatedAt && <div><span className="font-medium">Updated:</span> {String(updatedAt)}</div>}
     </div>
   </div>
 );
}

