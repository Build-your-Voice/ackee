import { createElement as h, Fragment } from 'react'

import referrersLoader from '../../loaders/referrersLoader'
import enhanceReferrers from '../../enhancers/enhanceReferrers'
import * as selectDomainsValue from '../../selectors/selectDomainsValue'
import overviewRoute from '../../utils/overviewRoute'
import useWidgetIds from '../../utils/useWidgetIds'

import CardReferrers from '../cards/CardReferrers'

const RouteReferrers = (props) => {

	const widgetIds = useWidgetIds(props, referrersLoader, {
		range: props.filter.range,
		sorting: props.filter.sorting
	})

	return (
		h(Fragment, {},

			widgetIds.map(
				(widgetId) => {
					const widget = props.widgets.value[widgetId]
					if (widget == null) return h('p', {}, 'empty')

					const domain = selectDomainsValue.byId(props, widget.variables.domainId)

					return h(CardReferrers, {
						key: domain.id,
						headline: domain.title,
						range: widget.variables.range,
						sorting: widget.variables.sorting,
						loading: widget.fetching,
						items: enhanceReferrers(widget.value),
						onMore: () => props.setRoute(overviewRoute(domain))
					})
				}
			)

		)
	)

}

export default RouteReferrers