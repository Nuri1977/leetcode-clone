'use client'

import React from 'react'
import { RecoilRoot } from 'recoil'

const AppProviders = ({ children }: { children: React.ReactNode }) => {
	return (
		<RecoilRoot>
			{children}
		</RecoilRoot>
	)
}

export default AppProviders