// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract Storage {
    mapping(bytes32 => uint256) private fileHashes;

    function setFileHash(bytes32 _key) public {
        require(_key != 0, "File hash cannot be 0");
        require(fileHashes[_key] == 0, "File hash already set");
        fileHashes[_key] = block.timestamp;
    }

    function getFileHash(bytes32 _key) public view returns (uint256) {
        require(fileHashes[_key] != 0, "File hash not set");
        return fileHashes[_key];
    }
}
