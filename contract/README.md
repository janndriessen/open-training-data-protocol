## Foundry

**Foundry is a blazing fast, portable and modular toolkit for Ethereum application development written in Rust.**

Foundry consists of:

- **Forge**: Ethereum testing framework (like Truffle, Hardhat and DappTools).
- **Cast**: Swiss army knife for interacting with EVM smart contracts, sending transactions and getting chain data.
- **Anvil**: Local Ethereum node, akin to Ganache, Hardhat Network.
- **Chisel**: Fast, utilitarian, and verbose solidity REPL.

## Documentation

https://book.getfoundry.sh/

## Usage

### Build

```shell
$ forge build
```

### Test

```shell
$ forge test
```

### Format

```shell
$ forge fmt
```

### Gas Snapshots

```shell
$ forge snapshot
```

### Anvil

```shell
$ anvil
```

### Deploy

```shell
$ source .env
// check balance of account
cast balance <address> --rpc-url $ZIRCUIT_RPC_URL
// deploy
$ forge script script/OpenTrainingDataProtocol.s.sol:OpenTrainingDataProtocolScript --rpc-url $ZIRCUIT_RPC_URL --private-key $PRIVATE_KEY --broadcast
// verify
$ forge verify-contract --verifier sourcify 0xb67D905cA17002f798f1c0afD2Ec16737F2e6153 src/OpenTrainingDataProtocol.sol:OpenTrainingDataProtocol --root . --chain-id 48898
```

### Cast

```shell
$ cast <subcommand>
```

### Help

```shell
$ forge --help
$ anvil --help
$ cast --help
```
