# Download novel from net

## Show
![安装](images/install01.png)
![安装](images/doc01.png)

## Depedency
- [cherrio](https://cheerio.js.org/)  Fast, flexible & lean implementation of core jQuery designed specifically for the server.
- [inquirer](https://github.com/SBoudrias/Inquirer.js)  A collection of common interactive command line user interfaces.
## Install
Clone the repo using Git:
```
git clone https://github.com/Liar0320/spider.git
```

Alternatively you can download this repository and then:

```
npm i 
npm run start 
```

## Configuration options
#### timeout 
Timeout for each request. 

default value: 15000

#### maxThreadExist
The maximum number of threads that exist at one time, that is, the number of asynchronous downloads that are started at the same time.

default value: 20

#### rePullCount
The number of times the request was re initiated if there was a request failure.

default value: 4

#### downloadDirector
Root of download directory

default value: join(__dirname, './download') 