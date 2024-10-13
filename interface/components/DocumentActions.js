function DocumentActions({ file, signature, signDocument, publishDocument }) {

 return (
   <div className="bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-orange-500/20 transition duration-300">
     <h2 className="text-2xl font-semibold mb-4 text-orange-500">
       <i className="fas fa-signature mr-2"></i>Actions
     </h2>
     <div className="space-y-4">
       
         <div className="bg-gray-700 rounded-lg p-4 mb-4">
           <div className="flex items-center justify-between mb-2">
             <span className="text-sm text-orange-500 font-semibold select-none">
               Signature:
             </span>
             <button
               onClick={() => navigator.clipboard.writeText(signature)}
               className="text-gray-400 hover:text-orange-500 transition-colors duration-200"
               title="Copy signature"
             >
               <i className="fas fa-copy"></i>
             </button>
           </div>
           <p className="text-sm text-gray-300 break-all">{signature}</p>
         </div>
       <div className="flex space-x-4">
         <button
           onClick={signDocument}
           className="flex-1 bg-orange-500 hover:bg-orange-600 text-gray-900 font-bold py-2 px-4 rounded-full transition duration-300"
         >
           Sign Offline
         </button>
         <button
           onClick={publishDocument}
           className="flex-1 bg-gray-700 hover:bg-gray-600 text-orange-500 font-bold py-2 px-4 rounded-full transition duration-300"
         >
           Publish to Blockchain
         </button>
       </div>
     </div>
   </div>
 );
}
