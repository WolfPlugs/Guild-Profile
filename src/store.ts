/*
 * Copyright (c) 2020 - 2021 NurMarvin (Marvin Witt)
 * Licensed under the Open Software License version 3.0
 */


import { common } from 'replugged'
import FluxActions from './const'

const { flux, fluxDispatcher } = common

const memberCounts = []

function handleMemberCountsUpdate (memberCountsUpdate) {
  memberCounts.push(memberCountsUpdate)
}

class MemberCountsStore extends flux.Store {
  public getStore() {
    return {
      memberCounts,
    }
  }

  public getAllMemberCounts() {
    return memberCounts
  }

  public getMemberCounts(guildId) {
    return memberCounts.find(memberCounts => memberCounts.guildId === guildId)
  }
}



export default new MemberCountsStore(fluxDispatcher, {
  [FluxActions.FluxActions.UPDATE_MEMBER_COUNTS]: (guildId, members, membersOnline) => handleMemberCountsUpdate(guildId, members, membersOnline),
})
