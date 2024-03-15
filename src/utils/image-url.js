import { SERVER_BASE_URL } from './constants'

export function getAvatarUrl(name) {
   return `${SERVER_BASE_URL}/uploads/avatar/${name}`
}

export function getBlogThumbnailUrl(name) {
   return `${SERVER_BASE_URL}/uploads/blog/${name}`
}
