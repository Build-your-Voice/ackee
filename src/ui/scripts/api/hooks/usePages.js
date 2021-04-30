import { useQuery, gql } from '@apollo/client'

import domainFields from '../fragments/domainFields'

const FETCH_PAGES = gql`
	query fetchPages($sorting: Sorting!, $range: Range) {
		statistics {
			id
			pages(sorting: $sorting, range: $range) {
				id
				count
			}
		}
		domains {
			...domainFields
			statistics {
				id
				pages(sorting: $sorting, range: $range) {
					id
					count
					created
				}
			}
		}
	}

	${ domainFields }
`

export default (sorting, range) => {

	const { loading: fetching, error, data } = useQuery(FETCH_PAGES, {
		variables: {
			sorting,
			range
		}
	})

	return {
		fetching,
		stale: fetching === true && data != null,
		error,
		value: data == null ? { statistics: { pages: [] }, domains: [] } : data
	}

}