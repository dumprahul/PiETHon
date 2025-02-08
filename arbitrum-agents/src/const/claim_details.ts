import { Address } from "viem";


export const ERC20_ABI =[
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "claim",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "claimAmount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "setClaimAmount",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	}
];

export const ERC20_BYTECODE: Address = "0x6080604052662386f26fc100006001553480156019575f80fd5b50335f806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555061059f806100665f395ff3fe60806040526004361061004d575f3560e01c80633ccfd60b146100585780634e71d92d1461006e578063830953ab146100845780638da5cb5b146100ae578063b1c7ef0c146100d857610054565b3661005457005b5f80fd5b348015610063575f80fd5b5061006c610100565b005b348015610079575f80fd5b506100826101f2565b005b34801561008f575f80fd5b5061009861027f565b6040516100a59190610357565b60405180910390f35b3480156100b9575f80fd5b506100c2610285565b6040516100cf91906103af565b60405180910390f35b3480156100e3575f80fd5b506100fe60048036038101906100f991906103f6565b6102a8565b005b5f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461018d576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101849061047b565b60405180910390fd5b5f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc4790811502906040515f60405180830381858888f193505050501580156101ef573d5f803e3d5ffd5b50565b600154471015610237576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161022e906104e3565b60405180910390fd5b3373ffffffffffffffffffffffffffffffffffffffff166108fc60015490811502906040515f60405180830381858888f1935050505015801561027c573d5f803e3d5ffd5b50565b60015481565b5f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b5f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610335576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161032c9061054b565b60405180910390fd5b8060018190555050565b5f819050919050565b6103518161033f565b82525050565b5f60208201905061036a5f830184610348565b92915050565b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f61039982610370565b9050919050565b6103a98161038f565b82525050565b5f6020820190506103c25f8301846103a0565b92915050565b5f80fd5b6103d58161033f565b81146103df575f80fd5b50565b5f813590506103f0816103cc565b92915050565b5f6020828403121561040b5761040a6103c8565b5b5f610418848285016103e2565b91505092915050565b5f82825260208201905092915050565b7f4f6e6c79206f776e65722063616e2077697468647261770000000000000000005f82015250565b5f610465601783610421565b915061047082610431565b602082019050919050565b5f6020820190508181035f83015261049281610459565b9050919050565b7f4e6f7420656e6f7567682045544820696e20636f6e74726163740000000000005f82015250565b5f6104cd601a83610421565b91506104d882610499565b602082019050919050565b5f6020820190508181035f8301526104fa816104c1565b9050919050565b7f4f6e6c79206f776e65722063616e2073657420636c61696d20616d6f756e74005f82015250565b5f610535601f83610421565b915061054082610501565b602082019050919050565b5f6020820190508181035f83015261056281610529565b905091905056fea2646970667358221220748f9143b15983995a9c2568ecfced27d151bd9706d16d814f89a92db90673db64736f6c634300081a0033";
