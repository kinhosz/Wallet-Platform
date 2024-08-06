import MainButton from "~/components/button";
import Budget from "~/components/charts/budget";

export default function Planning() {
  return (
    <div className="m-4 flex flex-row justify-between">
      <div className="">
        <div className="text-wallet_orange text-xl text-center">Budget</div>
        <Budget beginning={400} ending={300} />        
      </div>
      <div className="">
        div2
      </div>
      <div>
        <MainButton onClick={()=>{}}>Close the month</MainButton>
        <div className="my-4">
          <div className="text-md">Current Period</div>
          <div className="text-sm">June,14 - August,17</div>
        </div>
      </div>
    </div>
  );
}
