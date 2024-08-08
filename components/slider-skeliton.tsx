import Container from "./container";

const SliderSkeliton = () =>{
    return(
        <div className="w-full max-h-[332px] h-[332px] max-[767px]:max-h-[200px] max-[767px]:h-[200px] bg-slate-700 mt-2
        px-16 max-[767px]:px-2">
             <div className="w-full max-h-[332px] max-[767px]:max-h-[200px] flex flex-col items-center justify-center p-4 rounded shadow-md">
               <Container className='w-4/5 flex flex-row max-h-[332px] items-start max-[767px]:max-h-[200px] gap-4'>
               
                 <div
                   className="bg-slate-50/70 aspect-[4/3] max-[767px]:aspect-[4/5] w-auto rounded-md h-[300px] max-[767px]:h-[120px]"
                 />
              
               <div className="flex-col w-3/5 items-start gap-6">
               <div className="h-[20px] w-[80%] mb-4 mt-2 bg-slate-100/80">
               </div>
              
               <div>
               <div className="h-[12px] w-[70%] mb-4 bg-slate-100/80">
               </div>
               
               <div className="h-[12px] w-[70%] mb-4 bg-slate-100/80">
               </div>
               </div>
               
               
               </div>
               </Container>
            </div>
        </div>

    )
}
export default SliderSkeliton;