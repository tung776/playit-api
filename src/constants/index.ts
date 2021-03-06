import * as Debug from 'debug';
import * as _ from 'lodash';
import * as path from 'path';
import * as fs from 'fs';

const debug = Debug('PL:Constant');

export const DB = {
    MONGO_URL: process.env.MONGO_URL
};
export const APP = {
    API_URL: process.env.API_URL,
    FRONT_END_URL: process.env.API_URL,
    FFPROBE_PATH: process.env.FFPROBE_PATH,
    ALLOWED_EMAILS: [],
    IS_SANDBOX: false,
    DOWNLOAD_AUDIO_CONCURRENCY: 3,
    DOWNLOAD_VIDEO_CONCURRENCY: 3
};

if (!_.isEmpty(process.env.DOWNLOAD_AUDIO_CONCURRENCY)) {
    try {
        APP.DOWNLOAD_AUDIO_CONCURRENCY = parseInt(process.env.DOWNLOAD_AUDIO_CONCURRENCY, 10);
    } catch (exception) {
        debug('exception ', exception);
    }
}

if (!_.isEmpty(process.env.DOWNLOAD_VIDEO_CONCURRENCY)) {
    try {
        APP.DOWNLOAD_VIDEO_CONCURRENCY = parseInt(process.env.DOWNLOAD_VIDEO_CONCURRENCY, 10);
    } catch (exception) {
        debug('exception ', exception);
    }
}

if (!_.isEmpty(process.env.ALLOWED_EMAILS)) {
    try {
        APP.ALLOWED_EMAILS = process.env.ALLOWED_EMAILS.split(',');
    } catch (exception) {
        debug('exception ', exception);
    }
}

if (process.env.SANDBOX === 'true') {
    APP.IS_SANDBOX = true;
}

export const ENDPOINT = {
    DOWNLOAD: `${APP.API_URL}/api/v1/youtube/crone/download`,
    UPLOAD: `${APP.API_URL}/api/v1/google-drive/crone/upload`,
    EMPTY_TRASH: `${APP.API_URL}/api/v1/google-drive/crone/empty/trash`,
    SYNC_TO_YOUTUBE: `${APP.API_URL}/api/v1/media-item/sync/crone/youtube`
};

export const YOUTUBE = {
    ID_SEPARATOR: '?v='
};

export const USER_ROLES = {
    ADMIN: {
        id: '1',
        name: 'ADMIN'
    }
};

export const SORT_BY = {
    ASCENDING_ORDER: 'ASC',
    DESCENDING_ORDER: 'DESC'
};

export const GOOGLE_AUTH = {
    CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    REDIRECT_URL: `${APP.API_URL}/api/v1/user/register/oauth/callback`,
    SCOPES: [
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/youtube'
    ]
};

export const MEDIA_DIRECTORY = {
    MEDIA: path.join(__dirname, '..', '..', 'media'),
    AUDIO: path.join(__dirname, '..', '..', 'media', 'audio'),
    VIDEO: path.join(__dirname, '..', '..', 'media', 'video'),
    THUMBNAIL: path.join(__dirname, '..', '..', 'media', 'thumbnail')
};

if (!fs.existsSync(MEDIA_DIRECTORY.MEDIA)) {
    fs.mkdirSync(MEDIA_DIRECTORY.MEDIA);
}
if (!fs.existsSync(MEDIA_DIRECTORY.AUDIO)) {
    fs.mkdirSync(MEDIA_DIRECTORY.AUDIO);
}
if (!fs.existsSync(MEDIA_DIRECTORY.VIDEO)) {
    fs.mkdirSync(MEDIA_DIRECTORY.VIDEO);
}
if (!fs.existsSync(MEDIA_DIRECTORY.THUMBNAIL)) {
    fs.mkdirSync(MEDIA_DIRECTORY.THUMBNAIL);
}

export const MEDIA_TYPE = {
    '0': 'AUDIO',
    '1': 'VIDEO',
    'AUDIO': '0',
    'VIDEO': '1'
};
export const MEDIA_EXTENSION = {
    'AUDIO': '.mp3',
    'VIDEO': '.mp4'
};

/**
 * EXECUTE | It will execute the Crone Job
 * STOP | It will never execute the Crone Job
 */
export const CRONE_JOB = {
    ACTION: process.env.CRONE_JOB_ACTION,
    EXECUTE: 'EXECUTE',
    STOP: 'STOP',
    TIMEZONE: 'Asia/Kolkata'
};

export const DOWNLOAD_AUDIO_SCHEDULE = {
    Seconds: '*',
    Minutes: '*',
    Hours: '*',
    DayOfMonth: '*',
    Months: '*',
    DayOfWeek: '*'
};
export const DOWNLOAD_VIDEO_SCHEDULE = {
    Seconds: '0',
    Minutes: '*/5',
    Hours: '*',
    DayOfMonth: '*',
    Months: '*',
    DayOfWeek: '*'
};

export const UPLOAD_AUDIO_SCHEDULE = {
    Seconds: '0',
    Minutes: '*/7',
    Hours: '*',
    DayOfMonth: '*',
    Months: '*',
    DayOfWeek: '*'
};

export const UPLOAD_VIDEO_SCHEDULE = {
    Seconds: '0',
    Minutes: '*/9',
    Hours: '*',
    DayOfMonth: '*',
    Months: '*',
    DayOfWeek: '*'
};

export const EMPTY_TRASH_SCHEDULE = {
    Seconds: '0',
    Minutes: '0',
    Hours: '*/24',
    DayOfMonth: '*',
    Months: '*',
    DayOfWeek: '*'
};

export const SYNC_TO_YOUTUBE_SCHEDULE = {
    Seconds: '0',
    Minutes: '0',
    Hours: '*/1',
    DayOfMonth: '*',
    Months: '*',
    DayOfWeek: '*'
};


if (_.isEmpty(DB.MONGO_URL)) {
    debug('----------------------------------------------------------------------------------- ');
    debug('ERROR :  Please export DatabaseUrl : MONGO_URL ,If exported, Ignore');
    debug('----------------------------------------------------------------------------------- ');
    process.exit(0);
}
if (_.isEmpty(APP.API_URL)) {
    debug('----------------------------------------------------------------------------------- ');
    debug('ERROR :  Please export API_URL');
    debug('----------------------------------------------------------------------------------- ');
    process.exit(0);
}
if (_.isEmpty(APP.ALLOWED_EMAILS)) {
    debug('----------------------------------------------------------------------------------- ');
    debug('ERROR :  Please export ALLOWED_EMAILS');
    debug('----------------------------------------------------------------------------------- ');
    process.exit(0);
}