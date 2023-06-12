# ryukoapi-shinigami
RyukoAPI-shinigami unofficial API from shinigami.id (Manga read Website)

# Installation
1. npm install
2. node app / npm start (npm start automatically update when file change, because using nodemon)
3. PORT running on 3001

## Documents (biar gak ngedukun)
API sewaktu waktu berubah,ntah itu nambah fitur atau mengurangi fitur(The API changes from time to time, whether it's adding features or reducing features)

### Status
checking status
```
/
```
Ex: http://localhost:3001/
### Home
checking home
```
/api/home
```
Ex: http://localhost:3001/api/home
### Project list
checking project list
```
/api/project/page/<:page>
```
Ex: http://localhost:3001/api/project/page/1
### Search Project
Search any project
```
/api/search/:query/page/:page?
```
Ex: http://localhost:3001/api/search/return/page/1
### Komik Detail
Detail about comic like a rating, author,synopsis, etc
```
/api/series/:endpoint
```
Ex: http://localhost:3001/api/series/overgeared/
### Komik Chapter
Comic chapter
```
/api/series/:endpoint/:endpoints
```
Ex: http://localhost:3001/api/series/overgeared/chapter-183

## Note:
if has any problem with the link u can add https://api.allorigins.win/raw?url=(https://example.org/)
