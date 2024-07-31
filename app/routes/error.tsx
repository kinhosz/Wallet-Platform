function InternalError() {
    return (
        <div className='bg-wallet_blue w-screen h-screen flex items-center justify-center font-wallet_primary'>
            <div 
                className='bg-orange-500 p-8 flex flex-col items-center justify-center rounded-lg'
                style={{ width: '600px', height: '200px' }}
            >
                <h2 className="text-white text-6xl font-bold text-center">Wallet is offline</h2>
                <h3 className="text-white text-2xl font-semibold text-center">Take a coffee</h3>
            </div>
        </div>
    );
}

export default InternalError;
