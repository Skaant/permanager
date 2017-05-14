import React, { Component } from 'react'

import categories from '../constants/categories'

const CategorySelectorItem = ({ index, value: category, selected, toggleSelection }) => 
    (
        <div className={ 'category-selector__item category-selector__item--' + category.label + ( selected ? ' category-selector__item--selected' : '' ) }
                title={ category.description }
                onClick={ () => toggleSelection(index, selected) }>
            { category.label }</div>
    )

class CategorySelector extends Component {

    constructor({ fullySelected = false, defaultValue = false }) {

        super()

        this.state = [0, 1, 2, 3, 4, 5, 6, 7].reduce((result, current) => {
                result[current] = (defaultValue && defaultValue.includes(current)) || fullySelected
                return result
            }, {})
    }

    componentWillReceiveProps(nextProps) {

        const { defaultValue } = nextProps
        
        if (defaultValue.toString() !== this.props.defaultValue.toString()) {
            
            this.setState(Object.assign({}, [0, 1, 2, 3, 4, 5, 6, 7].reduce((result, current) => {
                result[current] = defaultValue.includes(current)
                return result
            }, {})))
        }
    }

    toggleSelection(index, selected) {

        this.setState({ [index]: !selected })

        this.props.updateCategories([0, 1, 2, 3, 4, 5, 6, 7]
            .filter((value, _index) => (index === _index) ? !selected : this.state[_index])
        )
    }

    render() {

        const itemList = categories.map((value, index) => {

            const params = {
                key: index,
                index,
                value,
                selected: this.state[index],
                toggleSelection: this.toggleSelection.bind(this)
            }

            return (
                <CategorySelectorItem { ...params } />
            )
        })

        return (
            <div className="row category-selector">
                { itemList }
            </div>
        );
    }
}

export default CategorySelector;
