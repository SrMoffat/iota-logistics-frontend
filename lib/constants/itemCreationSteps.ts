const NAME_FIELD = {
    name: "name",
    type: "text",
    rules: [
        {
            type: "string",
            message: "Item name is a required field",
            required: true,
        },
    ],
    placeholder: "Laptop",
    // icon: AccountBookOutlined,
}
const DESCRIPTION_FIELD = {
    name: "description",
    type: "textarea",
    rules: [],
    placeholder: "Apple MacBook Pro 2022 M1 Chip",
    // icon: AccountBookOutlined,
}
const CATEGORY_FIELD = {
    name: "category",
    type: "textarea",
    rules: [],
    placeholder: "Apple MacBook Pro 2022 M1 Chip",
    // icon: AccountBookOutlined,
}

export default [
    {
        title: 'General',
        content: 'First-content',
    },
    {
        title: 'Specifics',
        content: 'Second-content',
    },
    {
        title: 'Logistics',
        content: 'Last-content',
    },
];

/**
 * 1. General Information
 * name - text input
 * description - text input
 * quantity - number input
 * colour - color picker
 * 
 * 2. Logistics Information
 * category - dropdwon select
 * supplier - text input
 * manufacturer - text input
 * handling - dropdwon select
 * 
 * 3. Specific Information
 * dimensions - number inputs then dropdown for units
 * weight - number inputs then dropdown for units
 */