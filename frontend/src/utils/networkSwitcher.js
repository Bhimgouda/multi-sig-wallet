const handleNetworkSwitch = async (isWeb3Enabled, chainId, web3, CHAIN_ID) => {
    // Enable Web3 if not already enabled
    if (!isWeb3Enabled) {
      return;
    }

    // Check if the current network is already Polygon
    if (parseInt(chainId) === CHAIN_ID) {
    //   toast.success("Already connected to Polygon network", ({
    //     "position": "top-right"
    //   }));
      return;
    }


    // Switch to Polygon network or add Polygon and then switch
    async function switchToPolygon() {
      try {
        await web3.provider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x7a69" }],
        });
      } catch (error) {
        if (error.code === 4902) {
          try {
            await web3.provider.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: "0x89",
                  chainName: "Polygon Mainnet",
                  rpcUrls: [
                    "https://polygon-mainnet.g.alchemy.com/v2/v5bVu3LW84m1q_CxAJLw2yW-qZKad2p4",
                  ],
                  nativeCurrency: {
                    name: "Matic",
                    symbol: "Matic",
                    decimals: 18,
                  },
                  blockExplorerUrls: ["https://polygonscan.com/"],
                },
              ],
            });
          } catch (error) {
            console.log(error);
          }
        }
      }
    }

    switchToPolygon();
};

export default handleNetworkSwitch;