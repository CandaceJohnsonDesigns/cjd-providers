(window["webpackJsonp_cjd_services"] = window["webpackJsonp_cjd_services"] || []).push([["style-index"],{

/***/ "./blocks/medical-specialties/src/style.scss":
/*!***************************************************!*\
  !*** ./blocks/medical-specialties/src/style.scss ***!
  \***************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

}]);

/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"index": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp_cjd_services"] = window["webpackJsonp_cjd_services"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./blocks/medical-specialties/src/index.js","style-index"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./blocks/medical-specialties/src/edit.js":
/*!************************************************!*\
  !*** ./blocks/medical-specialties/src/edit.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Edit; });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/core-data */ "@wordpress/core-data");
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _use_post_terms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./use-post-terms */ "./blocks/medical-specialties/src/use-post-terms.js");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./editor.scss */ "./blocks/medical-specialties/src/editor.scss");


/**
 * External dependencies
 */


/**
 * WordPress dependencies
 */







/**
 * Internal dependencies
 */



/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */

function Edit(_ref) {
  var _selectedTerm$labels;

  let {
    attributes,
    setAttributes,
    context: {
      postType,
      postId
    }
  } = _ref;
  const {
    term,
    isInline,
    displayAcronym,
    textAlign,
    separator
  } = attributes;
  const TagName = isInline ? 'p' : 'ul';

  const toggleIsInline = () => {
    setAttributes({
      isInline: !isInline
    });
  };

  const toggleDisplayAcronym = () => {
    setAttributes({
      displayAcronym: !displayAcronym
    });
  };

  const availableTerms = Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_5__["useSelect"])(select => {
    const {
      getTaxonomies
    } = select(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_7__["store"]);
    const taxonomies = getTaxonomies({
      per_page: -1
    });
    const availableTaxonomies = Object(lodash__WEBPACK_IMPORTED_MODULE_2__["filter"])(taxonomies, taxonomy => Object(lodash__WEBPACK_IMPORTED_MODULE_2__["includes"])(taxonomy.types, postType));
    const visibleTaxonomies = Object(lodash__WEBPACK_IMPORTED_MODULE_2__["filter"])(availableTaxonomies, taxonomy => taxonomy.visibility.show_ui);
    const selectableTerms = visibleTaxonomies.map(term => ({
      label: term.name,
      value: term.slug
    }));
    return selectableTerms ? selectableTerms : {};
  });
  const selectedTerm = Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_5__["useSelect"])(select => {
    var _taxonomy$visibility;

    if (!term) return {};
    const {
      getTaxonomy
    } = select(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_7__["store"]);
    const taxonomy = getTaxonomy(term);
    return taxonomy !== null && taxonomy !== void 0 && (_taxonomy$visibility = taxonomy.visibility) !== null && _taxonomy$visibility !== void 0 && _taxonomy$visibility.publicly_queryable ? taxonomy : {};
  }, [term]);
  const {
    postTerms,
    hasPostTerms,
    isLoading
  } = Object(_use_post_terms__WEBPACK_IMPORTED_MODULE_8__["default"])({
    postId,
    postType,
    term: selectedTerm
  });
  const hasPost = postId && postType;
  const [meta, setMeta] = Object(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_7__["useEntityProp"])('taxonomy', term, 'meta');
  const blockProps = Object(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__["useBlockProps"])({
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()({
      [`has-text-align-${textAlign}`]: textAlign,
      [`taxonomy-${term}`]: term
    })
  });

  if (!hasPost || !term) {
    return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", blockProps, availableTerms ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__["Placeholder"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__["__"])('Select a taxonomy to list for this post')
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__["SelectControl"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__["__"])('Taxonomy'),
      value: term,
      options: availableTerms,
      onChange: newTerm => {
        setAttributes({
          term: newTerm
        });
      }
    })) : Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__["__"])('This page or post type does not support the Post Meta block.'));
  }

  return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__["BlockControls"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__["AlignmentToolbar"], {
    value: textAlign,
    onChange: nextAlign => {
      setAttributes({
        textAlign: nextAlign
      });
    }
  })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__["InspectorControls"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__["Panel"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__["PanelBody"], {
    title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__["__"])('Term Settings')
  }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__["SelectControl"], {
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__["__"])('Taxonomy'),
    value: term,
    options: availableTerms,
    onChange: newTerm => {
      setAttributes({
        term: newTerm
      });
    }
  }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__["ToggleControl"], {
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__["__"])('Display inline'),
    checked: isInline,
    onChange: toggleIsInline
  }), isInline && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__["TextControl"], {
    autoComplete: "off",
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__["__"])('Separator'),
    value: separator || '',
    onChange: nextValue => {
      setAttributes({
        separator: nextValue
      });
    },
    help: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__["__"])('Enter character(s) used to separate terms.')
  }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__["ToggleControl"], {
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__["__"])('Display Acronym'),
    checked: displayAcronym,
    onChange: toggleDisplayAcronym,
    help: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__["__"])('Display an acronym if available.')
  })))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(TagName, blockProps, isLoading && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__["Spinner"], null), !isLoading && hasPostTerms && isInline && postTerms.map(postTerm => Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("a", {
    key: postTerm.id,
    href: postTerm.link,
    onClick: event => event.preventDefault()
  }, displayAcronym && postTerm.meta['acronym'] ? postTerm.meta['acronym'] : postTerm.name)).reduce((prev, curr) => Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, prev, separator.trim() !== ',' && separator.trim() !== ';' && ` `, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("span", {
    className: "wp-block-post-terms__separator"
  }, separator.trim()), ` `, curr)), !isLoading && hasPostTerms && !isInline && postTerms.map(postTerm => Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("li", {
    key: postTerm.id
  }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("a", {
    href: postTerm.link,
    onClick: event => event.preventDefault()
  }, displayAcronym && postTerm.meta['acronym'] ? postTerm.meta['acronym'] : postTerm.name))), !isLoading && !hasPostTerms && ((selectedTerm === null || selectedTerm === void 0 ? void 0 : (_selectedTerm$labels = selectedTerm.labels) === null || _selectedTerm$labels === void 0 ? void 0 : _selectedTerm$labels.no_terms) || Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__["__"])('Term items not found.'))));
}

/***/ }),

/***/ "./blocks/medical-specialties/src/editor.scss":
/*!****************************************************!*\
  !*** ./blocks/medical-specialties/src/editor.scss ***!
  \****************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./blocks/medical-specialties/src/index.js":
/*!*************************************************!*\
  !*** ./blocks/medical-specialties/src/index.js ***!
  \*************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./style.scss */ "./blocks/medical-specialties/src/style.scss");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./edit */ "./blocks/medical-specialties/src/edit.js");
/**
 * WordPress dependencies
 */


/**
 * Internal dependencies
 */



/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */

Object(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__["registerBlockType"])('cjd-blocks/medical-specialties', {
  /**
   * @see ./edit.js
   */
  edit: _edit__WEBPACK_IMPORTED_MODULE_3__["default"]
});

/***/ }),

/***/ "./blocks/medical-specialties/src/use-post-terms.js":
/*!**********************************************************!*\
  !*** ./blocks/medical-specialties/src/use-post-terms.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return usePostTerms; });
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/core-data */ "@wordpress/core-data");
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/**
 * WordPress dependencies
 */


function usePostTerms(_ref) {
  var _term$visibility2;

  let {
    postId,
    postType,
    term
  } = _ref;
  const {
    rest_base: restBase,
    slug
  } = term;
  const [termIds] = Object(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_0__["useEntityProp"])('postType', postType, restBase, postId);
  return Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__["useSelect"])(select => {
    var _term$visibility;

    const visible = term === null || term === void 0 ? void 0 : (_term$visibility = term.visibility) === null || _term$visibility === void 0 ? void 0 : _term$visibility.publicly_queryable;

    if (!visible) {
      return {
        postTerms: [],
        _isLoading: false,
        hasPostTerms: false
      };
    }

    if (!termIds) {
      var _term$postTerms;

      // Waiting for post terms to be fetched.
      return {
        isLoading: term === null || term === void 0 ? void 0 : (_term$postTerms = term.postTerms) === null || _term$postTerms === void 0 ? void 0 : _term$postTerms.includes(postType)
      };
    }

    if (!termIds.length) {
      return {
        isLoading: false
      };
    }

    const {
      getEntityRecords,
      isResolving
    } = select(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_0__["store"]);
    const taxonomyArgs = ['taxonomy', slug, {
      include: termIds,
      context: 'view'
    }];
    const terms = getEntityRecords(...taxonomyArgs);

    const _isLoading = isResolving('getEntityRecords', taxonomyArgs);

    return {
      postTerms: terms,
      isLoading: _isLoading,
      hasPostTerms: !!(terms !== null && terms !== void 0 && terms.length)
    };
  }, [termIds, term === null || term === void 0 ? void 0 : (_term$visibility2 = term.visibility) === null || _term$visibility2 === void 0 ? void 0 : _term$visibility2.publicly_queryable]);
}

/***/ }),

/***/ "./node_modules/classnames/index.js":
/*!******************************************!*\
  !*** ./node_modules/classnames/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames() {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				if (arg.length) {
					var inner = classNames.apply(null, arg);
					if (inner) {
						classes.push(inner);
					}
				}
			} else if (argType === 'object') {
				if (arg.toString === Object.prototype.toString) {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				} else {
					classes.push(arg.toString());
				}
			}
		}

		return classes.join(' ');
	}

	if ( true && module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
}());


/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["wp"]["blockEditor"]; }());

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["wp"]["blocks"]; }());

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["wp"]["components"]; }());

/***/ }),

/***/ "@wordpress/core-data":
/*!**********************************!*\
  !*** external ["wp","coreData"] ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["wp"]["coreData"]; }());

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["wp"]["data"]; }());

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["wp"]["element"]; }());

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["wp"]["i18n"]; }());

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["lodash"]; }());

/***/ })

/******/ });
//# sourceMappingURL=index.js.map