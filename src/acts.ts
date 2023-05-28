/*
 * Copyright (c) 2020 - 2021 NurMarvin (Marvin Witt)
 * Licensed under the Open Software License version 3.0
 */


import { common } from 'replugged'
import FluxActions from './const'

const { fluxDispatcher } = common

export default {
  updateMemberCounts: async (memberCountsUpdate) => {
    fluxDispatcher.dispatch({
      type: FluxActions.FluxActions.UPDATE_MEMBER_COUNTS,
      ...memberCountsUpdate
    })
  }
}
