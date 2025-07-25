# Product Page Implementation Prompts

## Overview

This document provides structured prompts in XML and JSON formats for replicating the Grant Management System implementation across all other product pages. These prompts ensure consistent implementation while following the established template and standards.

## Table of Contents

- [Prompt Templates](#prompt-templates)
- [XML Format](#xml-format)
- [JSON Format](#json-format)
- [Usage Instructions](#usage-instructions)
- [Product Reference Table](#product-reference-table)
- [Implementation Examples](#implementation-examples)
- [Verification Checklist](#verification-checklist)

## Prompt Templates

### Purpose

These structured prompts provide a standardized way to request the implementation of detailed product pages using the Grant Management System as a template. Each prompt includes:

- Content extraction from the source website (issi-software.com)
- Component creation following the established pattern
- Translation integration across all three languages
- Routing integration and verification steps

## XML Format

```xml
<product_page_implementation>
  <task>
    <action>create_detailed_product_page</action>
    <template>grant_management_system</template>
    <source_integration>true</source_integration>
  </task>
  
  <target_product>
    <id>ects</id>
    <name>Electronic Correspondence Tracking System</name>
    <slug>electronic-correspondence-tracking-system</slug>
    <source_url>https://www.issi-software.com/Products/ProductInfo?project=ects</source_url>
    <image_path>/images/products/ectsproduct.png</image_path>
  </target_product>
  
  <requirements>
    <content_extraction>
      <source>issi_website</source>
      <sections>
        <hero>
          <tagline>required</tagline>
          <title>required</title>
          <context>required</context>
          <description>required</description>
          <image_alt>required</image_alt>
        </hero>
        <features>
          <count>8-15</count>
          <format>name_and_description</format>
          <icons>heroicons</icons>
        </features>
      </sections>
    </content_extraction>
    
    <component_creation>
      <template_file>ProductsGrantManagementSystemFeatures.tsx</template_file>
      <new_component_name>ProductsElectronicCorrespondenceTrackingSystemFeatures.tsx</new_component_name>
      <wrapper_component>ProductsElectronicCorrespondenceTrackingSystemFeaturesWrapper.tsx</wrapper_component>
    </component_creation>
    
    <translation_integration>
      <languages>
        <language code="en">english</language>
        <language code="es">spanish</language>
        <language code="fr">french</language>
      </languages>
      <key_structure>
        <pattern>products.ects.hero.*</pattern>
        <pattern>products.ects.features.*</pattern>
      </key_structure>
    </translation_integration>
    
    <routing_integration>
      <file>src/app/[lang]/products/[slug]/page.tsx</file>
      <condition>params.slug === 'electronic-correspondence-tracking-system'</condition>
      <component>ProductsElectronicCorrespondenceTrackingSystemFeaturesWrapper</component>
    </routing_integration>
  </requirements>
  
  <deliverables>
    <component_files>
      <file>src/components/ProductsElectronicCorrespondenceTrackingSystemFeatures.tsx</file>
      <file>src/components/ProductsElectronicCorrespondenceTrackingSystemFeaturesWrapper.tsx</file>
    </component_files>
    <translation_updates>
      <file>src/lang/en.json</file>
      <file>src/lang/es.json</file>
      <file>src/lang/fr.json</file>
    </translation_updates>
    <routing_update>
      <file>src/app/[lang]/products/[slug]/page.tsx</file>
    </routing_update>
  </deliverables>
  
  <verification>
    <urls>
      <url>http://localhost:3000/en/products/electronic-correspondence-tracking-system</url>
      <url>http://localhost:3000/es/products/electronic-correspondence-tracking-system</url>
      <url>http://localhost:3000/fr/products/electronic-correspondence-tracking-system</url>
    </urls>
    <testing>
      <command>npm run test:products:all</command>
    </testing>
  </verification>
</product_page_implementation>
```

## JSON Format

```json
{
  "product_page_implementation": {
    "task": {
      "action": "create_detailed_product_page",
      "template": "grant_management_system", 
      "source_integration": true
    },
    "target_product": {
      "id": "ects",
      "name": "Electronic Correspondence Tracking System",
      "slug": "electronic-correspondence-tracking-system",
      "source_url": "https://www.issi-software.com/Products/ProductInfo?project=ects",
      "image_path": "/images/products/ectsproduct.png"
    },
    "requirements": {
      "content_extraction": {
        "source": "issi_website",
        "sections": {
          "hero": {
            "tagline": "required",
            "title": "required", 
            "context": "required",
            "description": "required",
            "image_alt": "required"
          },
          "features": {
            "count": "8-15",
            "format": "name_and_description",
            "icons": "heroicons"
          }
        }
      },
      "component_creation": {
        "template_file": "ProductsGrantManagementSystemFeatures.tsx",
        "new_component_name": "ProductsElectronicCorrespondenceTrackingSystemFeatures.tsx",
        "wrapper_component": "ProductsElectronicCorrespondenceTrackingSystemFeaturesWrapper.tsx"
      },
      "translation_integration": {
        "languages": [
          { "code": "en", "name": "english" },
          { "code": "es", "name": "spanish" },
          { "code": "fr", "name": "french" }
        ],
        "key_structure": [
          "products.ects.hero.*",
          "products.ects.features.*"
        ]
      },
      "routing_integration": {
        "file": "src/app/[lang]/products/[slug]/page.tsx",
        "condition": "params.slug === 'electronic-correspondence-tracking-system'",
        "component": "ProductsElectronicCorrespondenceTrackingSystemFeaturesWrapper"
      }
    },
    "deliverables": {
      "component_files": [
        "src/components/ProductsElectronicCorrespondenceTrackingSystemFeatures.tsx",
        "src/components/ProductsElectronicCorrespondenceTrackingSystemFeaturesWrapper.tsx"
      ],
      "translation_updates": [
        "src/lang/en.json",
        "src/lang/es.json", 
        "src/lang/fr.json"
      ],
      "routing_update": [
        "src/app/[lang]/products/[slug]/page.tsx"
      ]
    },
    "verification": {
      "urls": [
        "http://localhost:3000/en/products/electronic-correspondence-tracking-system",
        "http://localhost:3000/es/products/electronic-correspondence-tracking-system", 
        "http://localhost:3000/fr/products/electronic-correspondence-tracking-system"
      ],
      "testing": {
        "command": "npm run test:products:all"
      }
    }
  }
}
```

## Usage Instructions

### **IMPORTANT: Reference Implementation Required**

🎯 **Before using any prompt template, ALWAYS review the reference implementation:**

**http://localhost:3000/en/products/grant-management-system**

This live URL shows the **exact layout and functionality** that should be replicated for all product pages. Use it as your visual and functional specification.

### Step-by-Step Process

#### 1. Choose Your Format
Select either the XML or JSON format based on your preference. Both contain identical information.

#### 2. Update Target Product Information
Replace the `target_product` section with the desired product details:

**XML Example:**
```xml
<target_product>
  <id>ets</id>
  <name>Environmental Tracking System</name>
  <slug>environmental-tracking-system</slug>
  <source_url>https://www.issi-software.com/Products/ProductInfo?project=ets</source_url>
  <image_path>/images/products/etsproduct.png</image_path>
</target_product>
```

**JSON Example:**
```json
"target_product": {
  "id": "ets",
  "name": "Environmental Tracking System",
  "slug": "environmental-tracking-system",
  "source_url": "https://www.issi-software.com/Products/ProductInfo?project=ets",
  "image_path": "/images/products/etsproduct.png"
}
```

#### 3. Update Component Names
Throughout the prompt, update all component names to match the new product:

**Pattern:**
- Main component: `Products[ProductName]Features.tsx`
- Wrapper component: `Products[ProductName]FeaturesWrapper.tsx`

**Example for Environmental Tracking System:**
- `ProductsEnvironmentalTrackingSystemFeatures.tsx`
- `ProductsEnvironmentalTrackingSystemFeaturesWrapper.tsx`

#### 4. Update Translation Keys
Replace the translation key patterns:
- From: `products.ects.hero.*` and `products.ects.features.*`
- To: `products.ets.hero.*` and `products.ets.features.*`

#### 5. Update Routing Condition
Replace the slug condition:
- From: `params.slug === 'electronic-correspondence-tracking-system'`
- To: `params.slug === 'environmental-tracking-system'`

#### 6. Submit Complete Prompt
Submit the fully updated XML or JSON prompt to initiate the implementation.

## Product Reference Table

### All 30 Products with Implementation Details

| # | Product ID | Product Name | Slug | Source Project Code | Priority |
|---|------------|--------------|------|-------------------|----------|
| 1 | `gms` | Grant Management System | `grant-management-system` | `project=gms` | ✅ **COMPLETE** |
| 2 | `ects` | Electronic Correspondence Tracking System | `electronic-correspondence-tracking-system` | `project=ects` | 🔥 **HIGH** |
| 3 | `ets` | Environmental Tracking System | `environmental-tracking-system` | `project=ets` | 🔥 **HIGH** |
| 4 | `mdsps` | Multi-Dimensional System Planning Solution | `multi-dimensional-system-planning-solution` | `project=mdsps` | 🔥 **HIGH** |
| 5 | `project-management` | Project Management Suite | `project-management-suite` | `project=pms` | 🟡 **MEDIUM** |
| 6 | `bug-tracking` | Bug Tracking System | `bug-tracking-system` | `project=bts` | 🟡 **MEDIUM** |
| 7 | `capture-manager` | Capture Manager | `capture-manager` | `project=cm` | 🟡 **MEDIUM** |
| 8 | `prudent-agile` | Prudent Agile Methodology | `prudent-agile-methodology` | `project=pam` | 🟡 **MEDIUM** |
| 9 | `task-management` | Task Management System | `task-management-system` | `project=tms` | 🟡 **MEDIUM** |
| 10 | `requirements-management` | Requirements Management System | `requirements-management-system` | `project=rms` | 🟡 **MEDIUM** |
| 11 | `hr-manager` | HR Management System | `hr-management-system` | `project=hrms` | 🔶 **LOW** |
| 12 | `employee-performance` | Employee Performance System | `employee-performance-system` | `project=eps` | 🔶 **LOW** |
| 13 | `timesheet-management` | Timesheet Management System | `timesheet-management-system` | `project=tms` | 🔶 **LOW** |
| 14 | `employee-talent-repository` | Employee Talent Repository | `employee-talent-repository` | `project=etr` | 🔶 **LOW** |
| 15 | `competency-skills-matrix` | Competency Skills Matrix | `competency-skills-matrix` | `project=csm` | 🔶 **LOW** |
| 16 | `training-dashboard` | Training Dashboard | `training-dashboard` | `project=td` | 🔶 **LOW** |
| 17 | `i-learn` | I-Learn System | `i-learn-system` | `project=ils` | 🔶 **LOW** |
| 18 | `rsvp` | RSVP Event Management | `rsvp-event-management` | `project=rem` | 🔶 **LOW** |
| 19 | `audit-reporting` | Audit Reporting System | `audit-reporting-system` | `project=ars` | 🔶 **LOW** |
| 20 | `expense-tracking` | Expense Tracking System | `expense-tracking-system` | `project=ets` | 🔶 **LOW** |
| 21 | `meeting-minutes-manager` | Meeting Minutes Manager | `meeting-minutes-manager` | `project=mmm` | 🔶 **LOW** |
| 22 | `training-records` | Training Records System | `training-records-system` | `project=trs` | 🔶 **LOW** |
| 23 | `central-data` | Central Data Platform | `central-data-platform` | `project=cdp` | 🔶 **LOW** |
| 24 | `e-survey` | E-Survey Platform | `e-survey-platform` | `project=esp` | 🔶 **LOW** |
| 25 | `form-management` | Form Management System | `form-management-system` | `project=fms` | 🔶 **LOW** |
| 26 | `i-code` | I-Code Testing Platform | `i-code-testing-platform` | `project=itp` | 🔶 **LOW** |
| 27 | `professional-management` | Professional Management System | `professional-management-system` | `project=pms` | 🔶 **LOW** |
| 28 | `complaint-tracking` | Complaint Tracking System | `complaint-tracking-system` | `project=cts` | 🔶 **LOW** |
| 29 | `inventory-asset-tracking` | Inventory Asset Tracking System | `inventory-asset-tracking-system` | `project=iats` | 🔶 **LOW** |
| 30 | `visitor-log` | Visitor Log System | `visitor-log-system` | `project=vls` | 🔶 **LOW** |

### Priority Legend
- ✅ **COMPLETE**: Fully implemented with detailed page
- 🔥 **HIGH**: Featured products, high business value
- 🟡 **MEDIUM**: Core functionality products
- 🔶 **LOW**: Specialized or niche products

## Implementation Examples

### Example 1: Environmental Tracking System (ETS)

**XML Prompt:**
```xml
<product_page_implementation>
  <task>
    <action>create_detailed_product_page</action>
    <template>grant_management_system</template>
    <source_integration>true</source_integration>
  </task>
  
  <target_product>
    <id>ets</id>
    <name>Environmental Tracking System</name>
    <slug>environmental-tracking-system</slug>
    <source_url>https://www.issi-software.com/Products/ProductInfo?project=ets</source_url>
    <image_path>/images/products/etsproduct.png</image_path>
  </target_product>
  
  <requirements>
    <component_creation>
      <new_component_name>ProductsEnvironmentalTrackingSystemFeatures.tsx</new_component_name>
      <wrapper_component>ProductsEnvironmentalTrackingSystemFeaturesWrapper.tsx</wrapper_component>
    </component_creation>
    
    <translation_integration>
      <key_structure>
        <pattern>products.ets.hero.*</pattern>
        <pattern>products.ets.features.*</pattern>
      </key_structure>
    </translation_integration>
    
    <routing_integration>
      <condition>params.slug === 'environmental-tracking-system'</condition>
      <component>ProductsEnvironmentalTrackingSystemFeaturesWrapper</component>
    </routing_integration>
  </requirements>
  
  <!-- Rest of the structure remains the same -->
</product_page_implementation>
```

### Example 2: Multi-Dimensional System Planning Solution (MDSPS)

**JSON Prompt:**
```json
{
  "product_page_implementation": {
    "target_product": {
      "id": "mdsps",
      "name": "Multi-Dimensional System Planning Solution",
      "slug": "multi-dimensional-system-planning-solution",
      "source_url": "https://www.issi-software.com/Products/ProductInfo?project=mdsps",
      "image_path": "/images/products/mdspsproduct.png"
    },
    "requirements": {
      "component_creation": {
        "new_component_name": "ProductsMultiDimensionalSystemPlanningFeatures.tsx",
        "wrapper_component": "ProductsMultiDimensionalSystemPlanningFeaturesWrapper.tsx"
      },
      "translation_integration": {
        "key_structure": [
          "products.mdsps.hero.*",
          "products.mdsps.features.*"
        ]
      },
      "routing_integration": {
        "condition": "params.slug === 'multi-dimensional-system-planning-solution'",
        "component": "ProductsMultiDimensionalSystemPlanningFeaturesWrapper"
      }
    }
  }
}
```

## Verification Checklist

### Post-Implementation Verification

After implementing each product page, verify the following:

#### ✅ **Component Files Created**
- [ ] Main component: `Products[ProductName]Features.tsx`
- [ ] Wrapper component: `Products[ProductName]FeaturesWrapper.tsx`
- [ ] Both files follow the GMS template structure

#### ✅ **Translation Keys Added**
- [ ] English translations in `src/lang/en.json`
- [ ] Spanish translations in `src/lang/es.json`
- [ ] French translations in `src/lang/fr.json`
- [ ] All keys follow the pattern: `products.[id].hero.*` and `products.[id].features.*`

#### ✅ **Routing Integration**
- [ ] Route condition added to `src/app/[lang]/products/[slug]/page.tsx`
- [ ] Correct slug condition: `params.slug === '[product-slug]'`
- [ ] Wrapper component imported and rendered

#### ✅ **Content Integration**
- [ ] Hero section content extracted from source website
- [ ] 8-15 features with names and descriptions
- [ ] Appropriate icons assigned to each feature
- [ ] Image path correctly configured

#### ✅ **URL Testing**
- [ ] English URL works: `http://localhost:3000/en/products/[slug]`
- [ ] Spanish URL works: `http://localhost:3000/es/products/[slug]`
- [ ] French URL works: `http://localhost:3000/fr/products/[slug]`
- [ ] All URLs return 200 status code

#### ✅ **Quality Checks**
- [ ] Text is left-aligned in hero section
- [ ] Dark mode support functional
- [ ] Responsive design on mobile/tablet/desktop
- [ ] All translation keys render properly
- [ ] Images load correctly
- [ ] Icons display properly

#### ✅ **Testing Commands**
```bash
# Test all product URLs
npm run test:products:all

# Test specific product (replace with actual URL)
curl http://localhost:3000/en/products/[product-slug]
```

## Best Practices

### Implementation Tips

1. **Content Quality**: Ensure extracted content is comprehensive and properly formatted
2. **Icon Selection**: Choose appropriate Heroicons that match each feature's purpose
3. **Translation Consistency**: Maintain consistent terminology across all languages
4. **Image Optimization**: Use optimized images with proper alt text
5. **Component Naming**: Follow PascalCase naming convention consistently

### Common Pitfalls to Avoid

1. **Inconsistent Translation Keys**: Ensure all key patterns match exactly
2. **Missing Wrapper Components**: Always create both main and wrapper components
3. **Routing Conflicts**: Verify slug conditions are unique and correct
4. **Image Path Errors**: Ensure image paths are correct and images exist
5. **Icon Import Issues**: Verify all Heroicons are properly imported

### Performance Considerations

1. **Lazy Loading**: Components are automatically lazy-loaded via dynamic routing
2. **Image Optimization**: Use Next.js Image component where possible
3. **Bundle Size**: Each component is code-split automatically
4. **Translation Loading**: Keys are loaded per locale to minimize bundle size

---

## Conclusion

These structured prompts provide a standardized, repeatable process for implementing detailed product pages across the entire ISSI product portfolio. By following these templates and guidelines, you can ensure consistent quality, functionality, and user experience across all 30 product pages while maintaining the established design patterns and technical standards.

The XML and JSON formats offer flexibility in how you structure your implementation requests, while the comprehensive verification checklist ensures each implementation meets the required quality standards.