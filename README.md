# nextjs-lit-gating-for-unity

## setup 

### STEP 1 : fill env file

fill the env file

### STEP 2 : create an enrypted file

go to localhost:3000/encrypt_wasm page

then upload a file and click on encrypt

After some seconds you should see the symmetric encrypted key .



then copy paste the encrypted wasm file inside `public/unitybuild/prod/` and delete (OR BACKUP AND DELETE) `public/unitybuild/prod/tetrisdemoone.wasm`


copy  `DECRYPT_SYMMETRIC_KEY` value in the .env file.



deploy
deploy
deploy