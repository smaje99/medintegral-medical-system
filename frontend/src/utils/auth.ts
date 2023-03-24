import type { Session } from "next-auth";

/**
 * Check if the current user has a permission with its action.
 */
export function hasPermission(
    session: Session,
    permission: string,
    action: 'creación' | 'lectura' | 'modificación' | 'deshabilitar'
): boolean {
    return !!session
        ?.user
        .permissions
        ?.[permission]
        ?.includes(action);
}