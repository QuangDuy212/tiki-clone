
import slugify from 'slugify';

export const convertSlugUrl = (str: string) => {
    if (!str) return "";
    return slugify(str, {
        lower: true,
        locale: 'vi',
    })
}