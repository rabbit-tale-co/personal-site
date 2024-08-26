import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../context/authContext'

const withAuth = <P extends object>(
	WrappedComponent: React.ComponentType<P>
) => {
	return (props: P) => {
		const { user, status } = useAuth()
		const router = useRouter()

		useEffect(() => {
			if (status === 'success' && !user) {
				router.push('/login')
			}
		}, [user, status, router])

		if (status === 'loading') {
			return <div>Loading...</div>
		}

		return <WrappedComponent {...props} />
	}
}

export default withAuth
