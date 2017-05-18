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

        this.state = { category: defaultValue || null }
    }

    componentWillReceiveProps(nextProps) {

        const { defaultValue } = nextProps
        
        if (defaultValue && defaultValue !== this.props.defaultValue)            
            this.setState({ category: defaultValue})
    }

    toggleSelection(index, selected) {

        const category = selected ? null : index

        this.setState({ category  })

        this.props.updateCategory(category)
    }

    render() {

        const itemList = categories.map((value, index) => {

            const params = {
                key: index,
                index,
                value,
                selected: this.state.category === index,
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
