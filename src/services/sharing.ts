/** Placeholder until group invites are wired to the backend. */
export const SharingService = {
  async respondToInvite(_inviteId: string, _status: 'accepted' | 'rejected'): Promise<void> {
    throw new Error('Sharing is not configured')
  },
}
