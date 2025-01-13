# Streaming platform testing

The project is heavily in progress (although the backend is functioning somewhat well).

The purpose of this project is to be investigate what it takes to create stream.streaming service. The streaming-part is built using [node-fluent-ffmpeg](https://github.com/fluent-ffmpeg/node-fluent-ffmpeg).
Also, as a personal experiment, one purpose of this project is to improve my skills on TypeScript and React. MongoDB is used for storing the metadata of streams.

Users can view streams using their link containing their own API-key (for instance, by using VLC).

The idea is that the program is given a new stream (a .m3u8-link), which is sent to `<backend>/newstream`. To do this, the user has to be an admin.

## Backend

### Major streaming-related HTTP-endpoints:

- `/newstream` to add a new stream to the service as an admin (POST). An example body would be following:
```
{
    "name": "Stream 1",
    "input": "https://address.for.the.stream/stream.m3u8",
    "disableTlsCheck": true,
    "category": "Entertainment",
    "permission": "limited"
}
```
`name` implies to to the name of the stream which is used for showing the stream.

`input` is the source for the stream.

`disableTlsCheck` is used to tell should `ffmpeg` ignore invalid TLS-certificates.

`category` is used to determine the category of the stream.

`permission` is used to set the permission-level for accessing the stream (`limited`, `user`, `fulluser`, `admin`). 

- `/streams` to get a list of names of streams user has permission to see (GET).

- `/remove/stream-name` to remove stream given the name (POST). One has to be an admin.

- `/secretstream/<api-key>/<stream-name>` users can access streams encoded by the project (defined in `index.ts`).

### Major user management HTTP-endpoints:

- `/register` to register (POST). An example body would be following:
```
{
    "username": "the-given-username",
    "password": "the password for the user",
    "invitecode": "a generated invite code (the invitecode must be given for the first user too, but it does not have to be a specific one, the first user is always admin)"
}
```
- `/login` to login (POST). An example body would be following:
```
{
    "username": "the-given-username",
    "password:" "the password for the user"
}
```
- `/logout` to logoff (POST). Because the authentication happens using HTTP-only cookies (coming when `Basic-frontend`-branch has been merged into main), this logs off the user automatically.

- `/users/newinvite` to create a new invite code as an user admin (POST). 

- `/users/getinvites` to get the list of invites (GET).

- `/users/renewapi` to allow users to renew their API-keys (POST).

The project also contains user-handling-related endpoints which can be used without logging in/creating an account. These endpoints can be seen at `backend/routes/userRoutes.ts` (they do require that the `ENVIRONMENT`-variable has been set to `DEV` to function). 



## ToDo:
#### A lot of different things, such as:
- Frontend (well, there's `Basic-frontend`-branch, but still, doesn't cover much)
- Ensuring that users cannot access other streams using API-key-streams
- Improving README.md
- Adding a m3u8-player for the users
- Creating staging and production server
- Dockerizing this project
- One could restart the stream if admin.
